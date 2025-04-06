import { Mail, Phone, Facebook, Twitter, Instagram, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="h-[calc(100vh-80px)] py-16 px-6 text-white">
      <div className="bg-white/30 backdrop-blur-md shadow-lg p-8 px-15 rounded-2xl space-y-12">

        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-3">
            <p className="text-lg font-semibold">Email</p>
            <div className="flex items-center space-x-3">
              <Mail size={24} />
              <a href="mailto:aynuman19@gmail.com" className="hover:underline">
                aynuman19@gmail.com
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-semibold">Phone</p>
            <div className="flex items-center space-x-3">
              <Phone size={24} />
              <a href="tel:+251988974566" className="hover:underline">
                +251988974566
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-semibold">Follow Us</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MapPin size={24} />
            <h2 className="text-2xl font-bold">Find Us</h2>
          </div>
          <div className="w-full rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.2503917274125!2d38.80717847449753!3d8.885170691224854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b82a7e392203f%3A0xb05f440eacc98f9f!2sAddis%20Ababa%20Science%20and%20Technology%20University!5e1!3m2!1sen!2set!4v1743923524955!5m2!1sen!2set"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
