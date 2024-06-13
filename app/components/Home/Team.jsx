import Image from "next/image";
import React from "react";
import Person1 from "@/public/assets/images/person.jpg";
import Person2 from "@/public/assets/images/person.jpg";

const members = [
  {
    name: "Dr. Dave, MD",
    specialty: "Internal Medicine",
    description:
      "Dr. Dave specializes in diagnosing and managing a wide range of medical conditions.",
    imageSrc: Person1,
    bgColor: "#8A238766",
  },
  {
    name: "Dr. Dave, MD",
    specialty: "Internal Medicine",
    description:
      "Dr. Dave specializes in diagnosing and managing a wide range of medical conditions.",
    imageSrc: Person2,
    bgColor: "#00B2A966",
  },
  {
    name: "Dr. Dave, MD",
    specialty: "Internal Medicine",
    description:
      "Dr. Dave specializes in diagnosing and managing a wide range of medical conditions.",
    imageSrc: Person1,
    bgColor: "#8A238766",
  },
  {
    name: "Dr. Dave, MD",
    specialty: "Internal Medicine",
    description:
      "Dr. Dave specializes in diagnosing and managing a wide range of medical conditions.",
    imageSrc: Person2,
    bgColor: "#00B2A966",
  },
];

const Team = () => {
  return (
    <section className="bg-white">
      <div className=" bg-[url('/assets/images/pattern.png')] bg-contain bg-no-repeat lg:min-h-[740px] py-24">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8 space-y-36 xl:space-y-48">
          <div className="text-center w-full flex flex-col gap-6">
            <span>
              <p className="text-[14px] font-bold text-[#1E1C27] uppercase">
                OUR TEAM
              </p>
              <hr className="border-[2px] border-[#00B2A9] w-[40px] mx-auto" />
            </span>

            <p className="text-[#7A8A98] text-[14px] font-medium max-w-[1010px] mx-auto text-center">
              At <span className="text-[#00B2A9]">Academia</span>, our dedicated
              team of highly qualified professionals spans diverse specialties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 gap-y-32 place-items-center">
            {members.map((member, index) => (
              <div key={index} className="max-w-[240px] space-y-4">
                <div className="relative">
                  <Image
                    src={member.imageSrc}
                    className="w-[240px] h-[318px] absolute bottom-0"
                    alt={member.name}
                    width={240}
                    height={318}
                  />
                  <div
                    className={`w-[238px] h-[235px]`}
                    style={{ backgroundColor: member.bgColor }}
                  />
                </div>
                <p className="text-[#1A1A1A] text-base font-medium">
                  <span className="font-bold">{member.name}</span> -{" "}
                  {member.specialty}
                </p>
                <p className="text-[#7A8A98A3] text-[12px] font-normal">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
