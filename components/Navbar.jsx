import Link from "next/link";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from 'react-icons/bs'
import { FiKey } from "react-icons/fi";

const Navbar = () => (
  <Flex padding={'2'} borderBottom={'1px'} borderColor='gray.100' >
    <Box fontSize={'3xl'} color='blue.400' fontWeight={'bold'}>
      <Link href='/' paddingLeft='2'>Риэлтор</Link>
    </Box>
    <Spacer />
    <Box>
      <Menu>
        <MenuButton as={IconButton} icon={<FcMenu />} variant='outlined' colof={'red.400'} />
        <MenuList>
          <Link href='/' passHref>
            <MenuItem icon={<FcHome />}>Назад</MenuItem>
          </Link>
          <Link href='/search' passHref>
            <MenuItem icon={<BsSearch />}>Найти</MenuItem>
          </Link>
          <Link href='/search?purpose=for_sale' passHref>
            <MenuItem icon={<FcAbout />}>Купить</MenuItem>
          </Link>
          <Link href='/search?purpose=for_rent' passHref>
            <MenuItem icon={<FiKey />}>Снять</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  </Flex >
);

export default Navbar