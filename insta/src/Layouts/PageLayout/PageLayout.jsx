import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

function PageLayout({ children }) {
  const { pathname } = useLocation();
  const authUser = useAuthStore((state) => state.user); // authUser'ı alıyoruz

  return (
    <Flex>
      {/* sol sidebar */}
      {pathname !== "/auth" && authUser ? ( // authUser varsa ve pathname "/auth" değilse Sidebar'ı render ediyoruz
        <Box>
          <Sidebar />
        </Box>
      ) : null}

      {/* sağ içerik sayfası */}
      <Box flex={1}>
        {children}
      </Box>
    </Flex>
  );
}

export default PageLayout;
