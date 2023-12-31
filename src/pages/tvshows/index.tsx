import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, Header, Image, List, Loader, Segment } from "semantic-ui-react";
import { fetchTvshowDetails } from "./query";

const TvShowsPage = () => {
  const { id } = useParams<string>();
  const { data, isLoading } = useQuery({
    queryKey: ["tvshow"],
    queryFn: () => fetchTvshowDetails(id as string),
  });

  if (!id) {
    return <h1>No id</h1>;
  } else if (isLoading) {
    return <Loader size="huge" active />;
  } else
    return (
      <div style={{ marginTop: 50 }}>
        <Segment>
          <Header>{data.name}</Header>
          <Grid columns={4} divided textAlign="left" style={{ marginTop: 50 }}>
            <Grid.Row>
              <Grid.Column>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Image
                    centered
                    size="medium"
                    src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  />
                </div>
              </Grid.Column>
              <Grid.Column width={3}>
                <List>
                  <List.Item>
                    <List.Header>Is the Movie 18+</List.Header>
                    {data.adult ? "Yes" : "No"}
                  </List.Item>
                  <List.Item>
                    <List.Header>Genre: </List.Header>
                    {data.genres?.map((genre: any) => (
                      <List.Item key={genre.id}>{genre.name}</List.Item>
                    ))}
                  </List.Item>
                  <List.Item>
                    <List.Header>Production companies</List.Header>
                    {data.production_companies
                      .map((company: any) => company.name)
                      .join(", ")}
                  </List.Item>
                  <List.Item>
                    <List.Header>Popularity</List.Header>
                    {data.popularity}
                  </List.Item>
                  <List.Item>
                    <List.Header>Number of Episodes</List.Header>
                    {data.number_of_episodes}
                  </List.Item>
                  <List.Item>
                    <List.Header>Number of Seasons</List.Header>
                    {data.number_of_seasons}
                  </List.Item>{" "}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
};

export default TvShowsPage;
