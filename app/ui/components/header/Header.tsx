import NavLinks from './nav-links';

export default function Header() {
  const env = process.env.NODE_ENV;
  return (
    <header>
      <p>Header current env === {env}</p>
      <NavLinks />
    </header>
  );
}
