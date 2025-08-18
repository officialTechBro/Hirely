import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gray-50 text-gray-500 overflow-hidden">
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="text-center space-y-8">
            {/* Logo/Brand */}
            <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-green-600 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl fonr-bold text-gray-800">Hirely</h3>
                </div>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Empowering skilled professionals to connect with forward-thinking companies across the globe. Your success is our priority.
                </p>
            </div>

            {/* Copyright */}
            <div className="">
            <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} OfficialTechBro. All rights reserved.
            </p>
            {/* <p className="text-xs text-gray-500">
                taiwooladosu1@gmail.com
            </p> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
