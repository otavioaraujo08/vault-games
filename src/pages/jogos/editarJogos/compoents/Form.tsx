import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ShadcnForm,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoginContext } from '@/context/LoginContext';
import { useToast } from '@/hooks/use-toast';
import { registerGameSchema } from '@/pages/jogos/cadastrarJogos/components/FormSchema';
import { gameService } from '@/services/games';
import { Game } from '@/types/Games';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

interface FormProps {
  game: Game;
  gameId: string;
}

export const Form = ({ game, gameId }: FormProps) => {
  const form = useForm<z.infer<typeof registerGameSchema>>({
    resolver: zodResolver(registerGameSchema),
    defaultValues: {
      description: game.description,
      hours: game.hours ? String(game.hours) : '0',
      image: game.image,
      nome: game.nome,
      review: game.review,
      status: game.status,
    },
  });
  const {
    formState: { errors },
  } = form;
  const { loginInfos } = LoginContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = form.handleSubmit(
    async (data: z.infer<typeof registerGameSchema>) => {
      try {
        await gameService.updateGame(gameId, {
          ...data,
          hours: Number(data.hours),
          userId: loginInfos.id,
        });

        toast({
          title: 'Jogo cadastrado com sucesso',
          description: 'O jogo foi cadastrado com sucesso',
          duration: 3000,
        });
        navigate('/jogos');
      } catch {
        toast({
          title: 'Erro ao cadastrar jogo',
          variant: 'destructive',
          duration: 4000,
        });
      }
    }
  );

  return (
    <ShadcnForm {...form}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col items-start gap-2 text-left">
          <h1 className="text-2xl font-bold dark:text-white">Cadastrar Jogo</h1>
          <p className="text-balance text-sm text-muted-foreground dark:text-[#C4C4C4]">
            Insira as informações do jogo para atualizar
          </p>
        </div>

        <hr className="w-full my-4 border-[#c4c4c4]" />
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="dark:text-white">Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o título do jogo"
                    className="w-full dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.nome?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Descrição</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira a descrição do jogo"
                    className="w-full dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.description?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Imagem</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira a URL da imagem"
                    className="w-full dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.image?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Horas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira a quantidade de horas jogadas"
                    className="w-full dark:text-white"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage>{errors.hours?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Review</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira a sua review do jogo"
                    className="w-full dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.review?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="dark:text-white">
                <FormLabel className="dark:text-white">Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={game.status}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status do andamento do jogo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Progresso">Progresso</SelectItem>
                    <SelectItem value="Pausado">Pausado</SelectItem>
                    <SelectItem value="Completo">Completo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full bg-green-600 text-white dark:text-white dark:bg-green-500 dark:hover:bg-green-700 hover:bg-green-700"
          >
            Atualizar
          </Button>
        </div>
      </form>
    </ShadcnForm>
  );
};
