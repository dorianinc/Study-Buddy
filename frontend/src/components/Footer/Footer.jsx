import { Container, Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import './Footer.css'
function Footer() {
  const [random, setRandom] = useState([]);

  const team = [
    {
      name: "An Ngo",
      github: "https://github.com/an-ngo-1427",
      linkedin: "https://www.linkedin.com/in/an-ngo-79a07a122/"
    },
    {
      name: "Dorian Macias",
      github: "https://github.com/dorianinc",
      linkedin: "https://www.linkedin.com/in/dorian-macias/"
    },
    {
      name: "Josh van Eyken",
      github: "https://github.com/jvaneyken",
      linkedin: "https://www.linkedin.com/in/joshvaneyken/"
    },
    {
      name: "Wilmer Sampedro",
      github: "https://github.com/wilmersampedro",
      linkedin: "https://www.linkedin.com/in/wilmer-sampedro/"
    },
  ]

  useEffect(() => {
    setRandom(team.sort(() => 0.5 - Math.random()))
  }, [])

  return (
    <Box id="footerBar">
      <Box className='footerTeamDiv'>
        <Heading as='h3' size='md' className='footerTeamHeader'>Development Team</Heading>
        <Box className='membersContainer'>
          {random && random.map((member, i) =>
            i !== team.length - 1 ? (
              <>
                <Box>
                  {member.name}{' '}
                  <Box className='footerLinksContainer'>
                    {member.github &&
                      <a
                        href={member.github}
                        className='footerLink'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <i className='fa-brands fa-github'></i>
                      </a>}{' '}
                    {member.linkedin &&
                      <a
                        href={member.linkedin}
                        className='footerLink'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <i className='fa-brands fa-linkedin'></i>
                      </a>}
                  </Box>
                </Box>{' '}
                <span className='footerSlashes'>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;</span>
              </>
            ) : (
              <>
                <Box>
                  {member.name}{' '}
                  <Box className='footerLinksContainer'>
                    {member.github &&
                      <a
                        href={member.github}
                        className='footerLink'
                        target='_blank'
                      >
                        <i className='fa-brands fa-github'></i>
                      </a>}{' '}
                    {member.linkedin &&
                      <a
                        href={member.linkedin}
                        className='footerLink'
                        target='_blank'
                      >
                        <i className='fa-brands fa-linkedin'></i>
                      </a>}
                  </Box>
                </Box>
              </>
            )
          )}
        </Box>
      </Box>
    </Box>
  )
}


export default Footer;
