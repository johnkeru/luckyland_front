import React from 'react'
import { NO_USER_IMAGE } from '../../utility_functions/cloudinaryUrl'
import useSearchStore from '../../hooks/useSearchStore';
import { Avatar, Grid, TableCell, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const TDEmployeeName = ({ emp }) => {
  const { searchEmployee } = useSearchStore();
  return (
    <TableCell
      sx={{
        position: 'relative',
      }}
    >
      <Grid display='flex' alignItems='center' gap={1.5}>
        <Avatar src={emp.image || NO_USER_IMAGE} />

        <Grid>
          <Grid display='flex' gap={1} alignItems='center'>

            <Typography style={{ display: 'flex', alignItems: 'center' }}>
              {emp.firstName.toLowerCase().includes(searchEmployee.toLowerCase()) ? (
                <span>
                  {emp.firstName.split(new RegExp(`(${searchEmployee})`, 'i')).map((part, index) => (
                    part.toLowerCase() === searchEmployee.toLowerCase() ? (
                      <span key={index} style={{ background: blue[500], color: 'white' }}>
                        {part}
                      </span>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  ))}
                </span>
              ) : (
                emp.firstName
              )}
            </Typography>

            {emp.middleName && <Typography style={{ display: 'flex', alignItems: 'center' }}>
              {emp.middleName.toLowerCase().includes(searchEmployee.toLowerCase()) ? (
                <span>
                  {emp.middleName.split(new RegExp(`(${searchEmployee})`, 'i')).map((part, index) => (
                    part.toLowerCase() === searchEmployee.toLowerCase() ? (
                      <span key={index} style={{ background: blue[500], color: 'white' }}>
                        {part}
                      </span>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  ))}
                </span>
              ) : (
                emp.middleName
              )}
            </Typography>}

            <Typography style={{ display: 'flex', alignItems: 'center' }}>
              {emp.lastName.toLowerCase().includes(searchEmployee.toLowerCase()) ? (
                <span>
                  {emp.lastName.split(new RegExp(`(${searchEmployee})`, 'i')).map((part, index) => (
                    part.toLowerCase() === searchEmployee.toLowerCase() ? (
                      <span key={index} style={{ background: blue[500], color: 'white' }}>
                        {part}
                      </span>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  ))}
                </span>
              ) : (
                emp.lastName
              )}
            </Typography>

          </Grid>

          <Typography sx={{ display: 'flex', alignItems: 'center', mt: -.5 }} variant='body2' color='gray'>
            {emp.email.toLowerCase().includes(searchEmployee.toLowerCase()) ? (
              <span>
                {emp.email.split(new RegExp(`(${searchEmployee})`, 'i')).map((part, index) => (
                  part.toLowerCase() === searchEmployee.toLowerCase() ? (
                    <span key={index} style={{ background: blue[500], color: 'white' }}>
                      {part}
                    </span>
                  ) : (
                    <span key={index}>{part}</span>
                  )
                ))}
              </span>
            ) : (
              emp.email
            )}
          </Typography>
        </Grid>

      </Grid>
    </TableCell>
  )
}

export default TDEmployeeName