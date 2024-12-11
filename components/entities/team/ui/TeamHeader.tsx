import Image from "next/image";

interface TeamHeaderProps {
  name: string;
  logo: string;
}

export function TeamHeader({ name, logo }: TeamHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-6 p-6">
        {/* Team Logo */}
        <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-white/10 p-2 backdrop-blur-sm">
          <Image
            src={logo}
            alt={`${name} logo`}
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-white md:text-3xl">{name}</h1>
      </div>
    </div>
  );
}
