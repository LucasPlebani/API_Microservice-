import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, HelpCircle, Settings, ShoppingBag } from "lucide-react";
import "./style/ShopDropdown.css";

const ShopDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="shop-dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="shop-dropdown__button">
        Mon magasin
        <ChevronDown size={18} />
      </button>

      {isOpen && (
        <div className="shop-dropdown__menu">
          <ul>
            <li>
              <a href="/profile">
                <ShoppingBag className="icon" />
            Modifier le magasin 
              </a>
            </li>
            <li>
              <a href="/settings">
                <Settings className="icon" />
                Parametres
              </a>
            </li>
            <li>
              <a href="/help">
                <HelpCircle className="icon" />
                Aide
              </a>
            </li>
            <li>
              <button onClick={() => console.log("Logging out...")}>
                <LogOut className="icon" />
                déconnexion
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShopDropdown;
