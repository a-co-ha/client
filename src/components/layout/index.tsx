import { NavBar } from '../navbar';

interface Props {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};
