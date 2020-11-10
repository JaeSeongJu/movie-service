import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import YouTube from "react-youtube";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0 10px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Icon = styled.a``;

const Image = styled.img`
  width: 40px;
  height: 40px;
  vertical-align: middle;
  display: inline-block;
  padding-bottom: 5px;
`;

const Info = styled.div`
  margin-top: 20px;
`;

const Trailer = styled(YouTube)`
  width: 100%;
  height: 300px;
`;

const Production = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
  margin: 10px 0;
  font-weight: bold;
  font-size: 15px;
  height: 100px;
  justify-content: space-around;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date
                : result.first_air_date}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            {result.imdb_id ? (
              <Icon
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="_blank"
              >
                <Image
                  src="https://img.icons8.com/color/2x/imdb.png"
                  alt="Link to IMDb"
                ></Image>
              </Icon>
            ) : (
              <Item>{"No Info in IMDB"}</Item>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Info>
            {result.videos.results[0] !== undefined ? (
              <Trailer videoId={result.videos.results.key}></Trailer>
            ) : (
              <Item>NO Trailer on YouTube</Item>
            )}
            {}
            <Production>
              {result.production_companies[0] !== undefined ? (
                <Item>
                  {`✅ Production Companies : ` +
                    result.production_companies.map((e, index) => ` ${e.name}`)}
                </Item>
              ) : (
                <Item>
                  ✅ Production Companies : NO INFO of Production Company
                </Item>
              )}
              {result.production_countries ? (
                <Item>
                  {`✅  Production Countries : ` +
                    result.production_countries.map((e, index) => ` ${e.name}`)}
                </Item>
              ) : (
                <Item>
                  ✅ Production Countries : NO INFO of Production Countries
                </Item>
              )}
              {result.seasons ? (
                <Item>
                  {`✅  Another Seasons : ` +
                    result.seasons.map(
                      (e) => ` ${e.season_number} / ${e.name}`
                    )}
                </Item>
              ) : (
                <Item></Item>
              )}
            </Production>
          </Info>
        </Data>
      </Content>
    </Container>
  );
DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
