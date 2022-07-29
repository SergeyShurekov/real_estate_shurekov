import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import Property from '../components/Property';
import { baseUrl, fetchApi } from "../utils/fetchApi";

export const Banner = ({ purpose, title1, title2, imageURL, desc1, desc2, linkName, buttonText }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageURL} width={500} height={300} alt="картинка" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}<br />{title2}
      </Text>
      <Text colore="gray.700" fontSize="lg" paddingBottom="3" fontWeight="medium">
        {desc1}<br />{desc2}
      </Text>
      <Button fontSize="xl" bg="blue.300" color="white">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

const Home = ({ propertiesForSale, propertiesForRent }) => (
  <Box>
    <Banner
      purpose="Аренда"
      title1="Жильё в аренду на"
      title2="выбор"
      desc1="Снять квартиру, аппартаменты,"
      desc2="дом и прочее"
      buttonText="См. аренда"
      linkName="/search?purpose=for-rent"
      imageURL="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
    />
    <Flex flexWrap='wrap'>
      {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
    <Banner
      purpose="Покупка"
      title1="Поиск жилья для "
      title2="приобретения"
      desc1="Осмотр квартир, аппартаментов, домов"
      desc2="и прочее"
      buttonText="См. покупка"
      linkName="/search?purpose=for-sale"
      imageURL="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
    />
    <Flex flexWrap='wrap'>
      {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
  </Box>
);

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=6020&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=6020&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home 