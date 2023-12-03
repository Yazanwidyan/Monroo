import { Text, Box } from "@chakra-ui/react";
import musicGenresData from "../../../constants/music_genres.json";

const MusicGenreLookup = ({ value }) => {
  const findMusicGenreName = (val) => {
    if (Array.isArray(val)) {
      return val
        .map((v) => {
          const musicGenre = musicGenresData.find((item) => item.id === v);
          return musicGenre ? musicGenre.name : v;
        })
        .join(", ");
    } else {
      const musicGenre = musicGenresData.find((item) => item.id === val);
      return musicGenre ? musicGenre.name : val;
    }
  };

  const musicGenreName = findMusicGenreName(value);

  return (
    <Box mb={2}>
      <Text fontWeight="400" fontSize="xs">
        Music Genre:
      </Text>
      <Text fontSize="sm" fontWeight={600}>
        {musicGenreName}
      </Text>
    </Box>
  );
};

export default MusicGenreLookup;
