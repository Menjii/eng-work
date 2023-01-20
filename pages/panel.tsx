import {
  Autocomplete,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { loadAccessControl } from '../src/accessControlFunctions';

const Panel = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [addressAccount, setAddresAccount] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [address, setAddress] = useState('');
  const [role, setRole] = useState<{ label: string; id: string }>({
    label: 'Admin',
    id: '0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42',
  });
  const [roleCheck, setRoleCheck] = useState<boolean>();

  const options = [
    {
      label: 'Admin',
      id: '0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42',
    },
    {
      label: 'User',
      id: '0x2db9fd3d099848027c2383d0a083396f6c41510d7acfd92adc99b6cffcf31e96',
    },
    {
      label: 'Viewer',
      id: '0xdfb118e7fb180cb21baebdc5d0b33ccc34c8e0be422c1a4f57131ff74b98ca6e',
    },
  ];

  const [adminTable, setAdminTable] = useState([]);
  const [userTable, setUserTable] = useState([]);
  const [viewerTable, setViewerTable] = useState([]);

  const adminArray = adminTable.map((value) => ({
    address: value,
    role: 'ADMIN',
  }));

  const userArray = userTable.map((value) => ({
    address: value,
    role: 'USER',
  }));

  const viewerArray = viewerTable.map((value) => ({
    address: value,
    role: 'USER',
  }));

  console.log(adminArray);
  console.log(adminTable);

  const rows = adminArray.concat(userArray, viewerArray);
  console.log(rows);

  const updateRoles = async (contract: any) => {
    await contract.returnArrayOfAdmins().then((response: any) => {
      setAdminTable(response);
    });
    await contract.returnArrayOfUsers().then((response: any) => {
      setUserTable(response);
    });
    await contract.returnArrayOfViewers().then((response: any) => {
      setViewerTable(response);
    });
  };

  const handleSetRole = async () => {
    await contract.setRole(role.id, address, { from: addressAccount });
    setRefresh(true);
  };

  const handleDeleteRole = async () => {
    await contract.deleteRole(role.id, address, { from: addressAccount });
    setRefresh(true);
  };

  const handleCheckRole = async () => {
    setRoleCheck(
      await contract.roles(role.id, address, { from: addressAccount })
    );
    setRefresh(true);
  };

  useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    loadAccessControl()
      .then((response: any) => {
        setAddresAccount(response.addressAccount);
        setContract(response.accessControlContract);
        setIsAdmin(response.isAdmin);
        updateRoles(response.accessControlContract);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  return (
    <Stack direction='column' justifyContent='center' sx={{ px: 2, py: 3 }}>
      {isAdmin ? (
        <>
          <Typography sx={{ pb: 2 }} variant='h4'>
            Welcome to the Admin Panel
          </Typography>
          <Stack direction='column' gap={2}>
            <TextField
              value={address}
              label={'address account'}
              fullWidth
              variant='standard'
              onChange={(event) => setAddress(event.target.value)}
            />
            <Autocomplete
              openOnFocus
              options={options}
              disableClearable
              value={role}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event, value) => setRole(value)}
              renderInput={(params) => (
                <TextField {...params} label={'set role'} variant='standard' />
              )}
            />
            <Button disabled={address === ''} onClick={handleSetRole}>
              Set role
            </Button>
            <Button disabled={address === ''} onClick={handleDeleteRole}>
              Delete role
            </Button>
            <Button disabled={address === ''} onClick={handleCheckRole}>
              Check role
            </Button>
            <Typography sx={{ mx: 'auto' }}>
              {roleCheck ? 'True' : 'False'}
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell align='right'>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.address}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}>
                      <TableCell component='th' scope='row'>
                        {row.address}
                      </TableCell>
                      <TableCell align='right'>{row.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </>
      ) : (
        <Typography variant='h4'>
          You have no access to this Panel, it's for Admin role only
        </Typography>
      )}
    </Stack>
  );
};

export default Panel;
