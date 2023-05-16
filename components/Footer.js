const Footer = ({ color }) => {
  return (
    <div className={`p-1 mt-4 text-center ${color}`}>
      <footer className={`bg-gradient-to-t to-black ${color} p-6 custom-footer`} style={{ marginTop: 'auto' }}>
        <div className="p-1 mt-4 text-center text-xs text-black font-semibold">
          © 2023 Copyright: Tisha Di Fresco
        </div>
      </footer>
    </div>
  );
};

export default Footer;
