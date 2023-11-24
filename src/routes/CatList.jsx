import styled from "styled-components";
import useCatApi from "../hooks/useCatApi";

const CatListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const UploadLink = styled.a`
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
`;

const ErrorText = styled.p`
  color: red;
`;

const CatCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const CatImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const VoteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const VoteButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
`;

const FavoriteButton = styled.button`
  padding: 8px;
  font-size: 16px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ScoreText = styled.p`
  font-size: 14px;
  margin: 0;
`;

function CatList() {
  const { catList, votes, favorites, error, voteCat, favoriteCat } = useCatApi();

  return (
    <CatListContainer>
      <Heading>Cat List</Heading>
      <UploadLink href="/upload">Upload</UploadLink>
      {error && <ErrorText>{error}</ErrorText>}
      {catList.map((cat) => (
        <CatCard key={cat.id}>
          <CatImage src={cat.url} alt={`Cat ${cat.id}`} />

          {/* Vote Buttons */}
          <VoteContainer>
            <VoteButton onClick={() => voteCat(cat.id, 1)}>Vote Up</VoteButton>
            <VoteButton onClick={() => voteCat(cat.id, 0)}>Vote Down</VoteButton>
          </VoteContainer>

          {/* Favorite Button */}
          <FavoriteButton onClick={() => favoriteCat(cat.id)}>
            {favorites[cat.id] ? "Unfavorite" : "Favorite"}
          </FavoriteButton>

          {/* Display Score */}
          <ScoreText>Score: {votes[cat.id]?.value || 0}</ScoreText>
        </CatCard>
      ))}
    </CatListContainer>
  );
}

export default CatList;
