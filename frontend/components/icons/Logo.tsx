import Image from "next/image";

const Logo = ({ ...props }) => (
  <Image src={"/logo.png"} width={1271} height={277} className="dark:invert-0 invert hover:opacity-90 transition-all duration-500"  alt="CredChain logo" {...props}></Image>
);

export default Logo;
