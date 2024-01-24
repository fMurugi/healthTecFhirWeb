// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, Container, MantineProvider,SimpleGrid } from '@mantine/core';
import LeftBar from './components/leftMenu';
import TopBar from './components/topBat';

// export const metadata = {
//   title: 'My Mantine app',
//   description: 'I have followed setup instructions carefully',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className='layout'>
          <TopBar/>
       
        
    
        <MantineProvider>
        
       
        
        
        
      <div>{children}</div>
  
  
                 
         </MantineProvider>
      </body>
    </html>
  );
}