import React from "react";
import Modal from "./Modal";

interface MediaModalProps {
  media: MediaItemType;
  onClose: () => void;
}

const MediaModal: React.FC<MediaModalProps> = ({ media, onClose }) => {
  return (
    <>
      <Modal
        isOpen={!!media}
        onClose={() => onClose()}
        title={media?.title || media?.name}
      >
        <div className="flex gap-2">
          {media.genres.map((genre: any) => (
            <span
              key={genre.id}
              className="center px-3 py-1 bg-gray-200 text-gray-700 rounded-md"
            >
              {genre.name}
            </span>
          ))}
        </div>
        <p className="mt-3 text-lg font-semibold">
          ⭐ {media.vote_average.toFixed(1)} / 10
        </p>
        <p className="text-gray-700 pt-4">{media.overview}</p>
      </Modal>
    </>
  );
};

export default MediaModal;
