import { SITE } from "@/lib/site";

type ShipmentNavProps = {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  soundOn: boolean;
  toggleSound: () => void;
};

const navLinks = [
  { href: "#manifest", label: "MANIFEST", title: "MANIFEST - my work" },
  { href: "#customs", label: "CUSTOMS", title: "CUSTOMS - about me" },
  { href: "#depot", label: "DEPOT", title: "DEPOT - playground" },
  { href: "#delivery", label: "DELIVERY", title: "DELIVERY - contact" },
];

export default function ShipmentNav({
  navOpen,
  setNavOpen,
  soundOn,
  toggleSound,
}: ShipmentNavProps) {
  return (
    <nav
      aria-label="Site"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 54,
        zIndex: 330,
        background: "var(--concrete)",
        borderBottom: "2px solid var(--ink)",
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "0 20px",
      }}
    >
      <div className="stencil" style={{ fontSize: 17, letterSpacing: ".04em" }}>
        SOJ <span style={{ color: "var(--safety)" }}>/</span> NATIVE LABS
      </div>
      <div
        className={`nav-links-desktop${navOpen ? " open" : ""}`}
      >
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            title={l.title}
            className="navlink"
            onClick={() => setNavOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </div>
      <button
        onClick={toggleSound}
        className="mono btn-push"
        aria-pressed={soundOn}
        style={{
          marginLeft: 10,
          fontSize: 10,
          background: "var(--paper)",
          padding: "6px 10px",
        }}
      >
        {soundOn ? "SOUND: ON" : "SOUND: OFF"}
      </button>
      <button
        className="mono btn-push nav-toggle"
        aria-expanded={navOpen}
        aria-label="Toggle section menu"
        onClick={() => setNavOpen((o) => !o)}
        style={{
          marginLeft: 8,
          fontSize: 10,
          background: "var(--paper)",
          padding: "6px 10px",
        }}
      >
        {navOpen ? "CLOSE ✕" : "MENU ☰"}
      </button>
    </nav>
  );
}
