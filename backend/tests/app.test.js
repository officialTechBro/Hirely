import { jest } from '@jest/globals'

// ── mock mongoose & DB before any app import ──────────────────────────────────
jest.unstable_mockModule('mongoose', () => {
    const schemaMock = function Schema(definition, options) {
        this.definition = definition
        this.options = options
        this.methods = {}
        this.statics = {}
        this.pre = jest.fn().mockReturnThis()
        this.index = jest.fn().mockReturnThis()
    }
    schemaMock.Types = { ObjectId: String }
    return {
        default: {
            connect: jest.fn().mockResolvedValue({}),
            connection: { host: 'mock' },
            Schema: schemaMock,
            model: jest.fn().mockReturnValue({}),
            Types: { ObjectId: String },
        },
        Schema: schemaMock,
    }
})

jest.unstable_mockModule('../config/db.js', () => ({
    default: jest.fn().mockResolvedValue({}),
}))

// ── mock all models ────────────────────────────────────────────────────────────
const mockUserModel = {
    findOne: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
}
jest.unstable_mockModule('../models/User.js', () => ({ default: mockUserModel }))
jest.unstable_mockModule('../models/Job.js', () => ({ default: {} }))
jest.unstable_mockModule('../models/Application.js', () => ({ default: {} }))
jest.unstable_mockModule('../models/SavedJob.js', () => ({ default: {} }))
jest.unstable_mockModule('../models/Analytics.js', () => ({ default: {} }))

// ── load supertest + app after all mocks are registered ───────────────────────
const { default: request } = await import('supertest')
const { default: app } = await import('../app.js')

// ── tests ──────────────────────────────────────────────────────────────────────
describe('Health check', () => {
    test('GET /api/health → 200 with status ok', async () => {
        const res = await request(app).get('/api/health')
        expect(res.status).toBe(200)
        expect(res.body.status).toBe('ok')
        expect(res.body.timestamp).toBeDefined()
    })
})

describe('Auth — protected route without token', () => {
    test('GET /api/analytics/overview → 401 when no Authorization header', async () => {
        const res = await request(app).get('/api/analytics/overview')
        expect(res.status).toBe(401)
        expect(res.body.message).toBeDefined()
    })

    test('GET /api/user/profile (PUT) → 401 without token', async () => {
        const res = await request(app).put('/api/user/profile').send({ name: 'Test' })
        expect(res.status).toBe(401)
    })
})

describe('Auth — registration input validation', () => {
    test('POST /api/auth/register with missing fields → 400 or 500 handled, not unhandled crash', async () => {
        // Model returns null for findOne (no existing user) and throws on create with missing required fields
        mockUserModel.findOne.mockResolvedValue(null)
        mockUserModel.create.mockRejectedValue(
            Object.assign(new Error('User validation failed: name: Path `name` is required.'), {
                name: 'ValidationError',
            })
        )

        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'Password1' })

        // Should be a 4xx/5xx — not an unhandled crash (which would close the connection)
        expect(res.status).toBeGreaterThanOrEqual(400)
        expect(res.body.message).toBeDefined()
    })

    test('POST /api/auth/login → 401 with wrong credentials', async () => {
        mockUserModel.findOne.mockResolvedValue(null)

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'noone@example.com', password: 'wrong' })

        expect(res.status).toBe(401)
        expect(res.body.message).toBeDefined()
    })
})

describe('404 handler', () => {
    test('Unknown route → 404', async () => {
        const res = await request(app).get('/api/does-not-exist')
        expect(res.status).toBe(404)
        expect(res.body.message).toBe('Route not found')
    })
})
