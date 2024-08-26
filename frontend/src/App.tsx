import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

type Card = {
  suit: string;
  value: string;
};

type GameState = {
  playerHand: (Card | null)[];
  communityCards: (Card | null)[];
  potSize: bigint;
  playerChips: bigint;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = async () => {
    setLoading(true);
    try {
      const result = await backend.initGame();
      if ('ok' in result) {
        setGameState(result.ok);
      } else {
        console.error('Error initializing game:', result.err);
      }
    } catch (error) {
      console.error('Error initializing game:', error);
    }
    setLoading(false);
  };

  const dealCards = async () => {
    setLoading(true);
    try {
      const result = await backend.dealCards();
      if ('ok' in result) {
        setGameState(result.ok);
      } else {
        console.error('Error dealing cards:', result.err);
      }
    } catch (error) {
      console.error('Error dealing cards:', error);
    }
    setLoading(false);
  };

  const performAction = async (action: string) => {
    setLoading(true);
    try {
      const result = await backend.performAction(action);
      if ('ok' in result) {
        setGameState(result.ok);
      } else {
        console.error('Error performing action:', result.err);
      }
    } catch (error) {
      console.error('Error performing action:', error);
    }
    setLoading(false);
  };

  const renderCard = (card: Card | null) => {
    if (!card) return <Box className="card placeholder">?</Box>;
    return (
      <Box className="card">
        <Typography color={card.suit === '♥' || card.suit === '♦' ? 'error' : 'inherit'}>
          {card.value}{card.suit}
        </Typography>
      </Box>
    );
  };

  if (!gameState) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" py={4}>
        <Typography variant="h4" gutterBottom>Texas Hold'em</Typography>
        
        <Box mb={2}>
          <Typography>Community Cards:</Typography>
          <Box display="flex" justifyContent="center">
            {gameState.communityCards.map((card, index) => (
              <Box key={index} mx={1}>
                {renderCard(card)}
              </Box>
            ))}
          </Box>
        </Box>

        <Box mb={2}>
          <Typography>Your Hand:</Typography>
          <Box display="flex" justifyContent="center">
            {gameState.playerHand.map((card, index) => (
              <Box key={index} mx={1}>
                {renderCard(card)}
              </Box>
            ))}
          </Box>
        </Box>

        <Box mb={2}>
          <Typography>Pot Size: {gameState.potSize.toString()}</Typography>
          <Typography>Your Chips: {gameState.playerChips.toString()}</Typography>
        </Box>

        <Box>
          <Button variant="contained" color="primary" onClick={() => performAction('check')} disabled={loading} sx={{ mr: 1 }}>
            Check
          </Button>
          <Button variant="contained" color="primary" onClick={() => performAction('bet')} disabled={loading} sx={{ mr: 1 }}>
            Bet
          </Button>
          <Button variant="contained" color="primary" onClick={() => performAction('fold')} disabled={loading} sx={{ mr: 1 }}>
            Fold
          </Button>
          <Button variant="contained" color="secondary" onClick={dealCards} disabled={loading}>
            Deal
          </Button>
        </Box>

        {loading && (
          <Box mt={2}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;
