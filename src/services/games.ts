import { Error } from '@/types/Error';
import { CreateGame, Game, UserGamesByStatus } from '@/types/Games';
import { api as apiService, ApiService, defaultUrl } from './api';

class GameService {
  constructor(private readonly api: ApiService) {}

  public getGames = async (): Promise<Game[]> => {
    const response = await this.api.get(`${defaultUrl}/games`);
    return response as Game[];
  };

  public getGamesByUser = async (id: string): Promise<Game[]> => {
    const response = await this.api.get(`${defaultUrl}/games/user/${id}`);
    return response as Game[];
  };

  public getGameInfosById = async (id: string): Promise<Game> => {
    const response = await this.api.get(`${defaultUrl}/games/${id}`);
    return response as Game;
  };

  public getLastUpdatedGameByUserId = async (id: string): Promise<Game[]> => {
    const response = await this.api.get(
      `${defaultUrl}/games/last-updated/user/${id}`
    );
    return response as Game[];
  };

  public getGameDistribuitionByUserId = async (
    id: string
  ): Promise<UserGamesByStatus> => {
    const response = await this.api.get(
      `${defaultUrl}/games/distribution/user/${id}`
    );
    return response as UserGamesByStatus;
  };

  public createGame = async (game: CreateGame): Promise<Partial<Error>> => {
    try {
      await this.api.post(`${defaultUrl}/games`, game);
      return {
        statusCode: 201,
      };
    } catch (error) {
      const { message, statusCode } = error as Error;
      return {
        statusCode,
        message,
      };
    }
  };

  public updateGame = async (id: string, game: CreateGame) => {
    await this.api.put(`${defaultUrl}/games/${id}`, game);
  };

  public deleteGame = async (id: string) => {
    await this.api.delete(`${defaultUrl}/games/${id}`);
  };
}
export const gameService = new GameService(apiService);
