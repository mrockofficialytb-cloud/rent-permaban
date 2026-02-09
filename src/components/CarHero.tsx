import Image from "next/image";

type Props = {
  name: string;
  plate: string;
  image: string;
  imageMobile: string;
};

export default function CarHero({ name, plate, image, imageMobile }: Props) {
  return (
    <section className="relative min-h-screen w-full flex items-end bg-black">
      {/* IMAGE */}
      <Image
        src={image}
        alt={name}
        fill
        priority
        className="hidden md:block object-cover"
      />
      <Image
        src={imageMobile}
        alt={name}
        fill
        priority
        className="block md:hidden object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 p-10 md:p-20 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-semibold text-white">
          {name}
        </h2>

        <p className="mt-4 text-zinc-300 text-lg">
          SPZ: {plate}
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/rezervace"
            className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition"
          >
            Rezervovat
          </a>

          <a
            href="#"
            className="px-6 py-3 border border-white/40 text-white rounded-full hover:bg-white/10 transition"
          >
            Detail vozu
          </a>
        </div>
      </div>
    </section>
  );
}
