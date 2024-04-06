import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const GET_HOMEPAGE = gql`
  query HomePage {
    homepages {
      nodes {
        heroHome {
          fieldGroupName
          textoHero
          tituloCabecera
          imagenHero {
            node {
              sourceUrl
            }
          }

          enlaceHero {
            target
            title
            url
          }
        }
      }
    }
  }
`;

function App() {

/*   function fetchData() {
    const url = 'http://wp-headless.lovestoblog.com/graphql/?query=query%20HomePage%20%7B%20homepages%20%7B%20nodes%20%7B%20heroHome%20%7B%20fieldGroupName%20textoHero%20tituloCabecera%20imagenHero%20%7B%20node%20%7B%20sourceUrl%20%7D%20%7D%20enlaceHero%20%7B%20target%20title%20url%20%7D%20%7D%20%7D%20%7D%20%7D';
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Manejar los datos obtenidos
        console.log(data);
      })
      .catch(error => {
        // Manejar errores de red u otros errores
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  fetchData(); */

  const { loading, error, data } = useQuery(GET_HOMEPAGE);
  if (loading) return
  if (error) {
    console.log(error);
    return
  }

  
  console.log(data);
  return
  const heroData = data.homepages.nodes[0].heroHome;

  return (
    <section className=" w-full justify-center items-center flex flex-col">
      <h1 className=" text-pink-700 my-12 text-4xl">React + wordpress headless</h1>

      <Card className="w-full max-w-[48rem] flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src={heroData.imagenHero.node.sourceUrl}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {heroData.tituloCabecera}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            {heroData.textoHero}
          </Typography>
          <a href={heroData.enlaceHero.url} target={heroData.enlaceHero.target} className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              {heroData.enlaceHero.title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>
    </section>
  );
}

export default App;
