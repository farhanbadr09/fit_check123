const Footer = () => {
  return (
    <footer className="bg-white border-t border-border px-6 py-4 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-text-secondary">
        <p>&copy; 2025 LookCheck. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <button className="hover:text-primary transition-colors">Privacy Policy</button>
          <button className="hover:text-primary transition-colors">Terms of Service</button>
          <button className="hover:text-primary transition-colors">Support</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
