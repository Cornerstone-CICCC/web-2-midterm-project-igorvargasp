import { Star } from "lucide-react";

export const MovieCard = ({ title, rating, color, url }) => {
  return (
    <div className="group cursor-pointer">
      <div
        className="relative aspect-2/3 rounded-lg overflow-hidden bg-linear-to-br mb-3 transition-transform group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}60)`,
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${url}`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-white/20">
            {title.charAt(0)}
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-white font-medium">{rating}</span>
        </div>
      </div>
      <h3 className="text-sm text-white font-medium truncate">{title}</h3>
    </div>
  );
};
