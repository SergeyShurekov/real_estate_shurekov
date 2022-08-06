import { useEffect, useState } from "react";
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from 'react-icons/md';
import Image from "next/image";

import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from '../utils/fetchApi'
import noresult from "../assets/images/IMG_20130807_100951.jpg";

export default function SearchFilters() {
  const [filters, setFilters] = useState(filterData);
  const [showLocations, setShowLocations] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState();
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value
      }
    })
    router.push({ pathname: path, query: query })
    console.log(router);
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
        setLoading(false)
        setLocationData(data?.hits);
      };
      fetchData();
    }
  }, [searchTerm]);

  return (
    <Flex bg={'gray.100'} p='4' justifyContent={'center'} flexWrap='wrap'>
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w='fit-content'
            p='2'
            onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}>
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      <Flex flexDir={'column'}>
        <Button onClick={() => setShowLocations(!showLocations)} border="1px" borderColor={'gray.200'} marginTop="2">Поиск места</Button>
        {showLocations && (
          <Flex flexDir={'column'} position="relative" paddingTop={'2'}>
            <Input
              placeholder="Набирай"
              value={searchTerm}
              width="300px"
              focusBorderColor="gray300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && (
              <Icon
                as={MdCancel}
                position='absolute'
                cursor={'pointer'}
                right={'5'}
                top={'5'}
                zIndex='100'
                onClick={() => setSearchTerm('')}
              />
            )}
            {loading && <Spinner margin={'auto'} marginTop='3' />}
            {showLocations && (
              <Box height={'300px'} overflow="auto">
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({ locationExternalIDs: location.externalID });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text cursor={'pointer'} bg="gray.200" padding={'2'} borderBottom="1px" borderColor={'gray.100'}>
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Flex justifyContent={'center'} alignItems="center" flexDirection={'column'} marginTop="5" marginBottom={'5'}>
                    <Image src={noresult} alt="ничего не найдено" />
                    <Text fontSize={'xl'} marginTop="3">
                      Ожидайте результат
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}