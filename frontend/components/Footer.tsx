export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Oscenox</h3>
          <p className="text-sm">
            Premium hospitality powered by smart technology and seamless guest
            experiences.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Properties</li>
            <li>Booking</li>
            <li>Restaurant</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm">Rishikesh, Uttarakhand</p>
          <p className="text-sm">+91 6201953551</p>
          <p className="text-sm">info@oscenox.com</p>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} Oscenox. All rights reserved.
      </div>
    </footer>
  );
}
