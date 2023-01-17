import {
  Autocomplete,
  Button,
  Stack,
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
  ];

  const handleGrantRole = async () => {
    await contract.grantRole(role.id, address, { from: addressAccount });
    setRefresh(true);
  };

  const handleRevokeRole = async () => {
    await contract.revokeRole(role.id, address, { from: addressAccount });
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
            <Button disabled={address === ''} onClick={handleGrantRole}>
              Grant role
            </Button>
            <Button disabled={address === ''} onClick={handleRevokeRole}>
              Revoke role
            </Button>
            <Button disabled={address === ''} onClick={handleCheckRole}>
              Check role
            </Button>
            <Typography sx={{ mx: 'auto' }}>
              {roleCheck ? 'True' : 'False'}
            </Typography>
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
