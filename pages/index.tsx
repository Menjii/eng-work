import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { load } from '../src/funcs';

const Home = () => {
  const [input, setInput] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(true);
  const [addressAccount, setAddresAccount] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleInputChange = (e: any) => setInput(e.currentTarget.value);

  const handleAddTask = async () => {
    await contract.createTask(input, { from: addressAccount });
    setInput('');
    setRefresh(true);
  };

  const handleToggled = async (id: number) => {
    await contract.toggleCompleted(id, { from: addressAccount });
    setRefresh(true);
  };

  useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load()
      .then((response: any) => {
        setIsError(false);
        setAddresAccount(response.addressAccount);
        setTasks(response.tasks);
        setContract(response.todoContract);
      })
      .catch((error) => {
        setIsError(true);
        setErrorText(error.message);
        console.log(error);
      });
  });

  return (
    <Stack direction='column' justifyContent='center'>
      <Head>
        <title>Blockchain</title>
        <meta name='description' content='content' />
      </Head>

      <Stack
        direction='column'
        alignItems='center'
        justifyContent='center'
        rowGap={3}>
        {isError ? (
          <Typography>{errorText}</Typography>
        ) : (
          <>
            <Typography variant='h3'>Todo Blockchain application</Typography>
            <Stack direction='row' columnGap={1}>
              <TextField
                value={input}
                variant='outlined'
                label='Add task'
                onChange={handleInputChange}
              />
              <Button
                variant='contained'
                color='primary'
                onClick={handleAddTask}>
                Add
              </Button>
            </Stack>
            <Typography>Tasks in todo state</Typography>
            {tasks === null ? (
              <CircularProgress />
            ) : (
              tasks.map((task, index) =>
                !task[2] ? (
                  <Paper
                    variant='outlined'
                    sx={{ p: 1, backgroundColor: '#F6FEDB' }}>
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      columnGap={1}
                      sx={{ width: 600 }}
                      key={index}>
                      <Typography sx={{ mr: 0 }}>{task[1]}</Typography>
                      <Button
                        variant='contained'
                        color='primary'
                        sx={{ ml: 0 }}
                        onClick={() => handleToggled(task[0].toNumber())}>
                        Done
                      </Button>
                    </Stack>
                  </Paper>
                ) : (
                  <></>
                )
              )
            )}
            <Typography>Tasks done</Typography>
            {tasks === null ? (
              <CircularProgress />
            ) : (
              tasks.map((task, index) =>
                task[2] ? (
                  <Paper
                    variant='outlined'
                    sx={{ p: 1, backgroundColor: '#DBFEE3' }}>
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      columnGap={1}
                      sx={{ width: 600 }}
                      key={index}>
                      <Typography>{task[1]}</Typography>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleToggled(task[0].toNumber())}>
                        Undone
                      </Button>
                    </Stack>
                  </Paper>
                ) : (
                  <></>
                )
              )
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Home;
