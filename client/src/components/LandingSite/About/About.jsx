import { TeamCard } from "./TeamMember";
function About() {

  const ameena = {
    name: "Ameena Afsar M",
    designation: "Software Engineer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  };

  return (
    <>
      <h1 className="font-bold text-white text-center text-5xl">
        About me!
      </h1>
      <div className="py-20 sm:py-25 flex gap-10 flex-wrap justify-center align-center">
        <TeamCard member={ameena} />
      </div>
    </>
  );
}
export { About };
