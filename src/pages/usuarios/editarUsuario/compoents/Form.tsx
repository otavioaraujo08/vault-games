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
import { useToast } from '@/hooks/use-toast';
import { userService } from '@/services/user';
import { UsersInfo } from '@/types/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { registerUserSchema } from '../../cadastrarUsuario/components/FormSchema';

interface FormProps {
  user: UsersInfo;
  userId: string;
}

export const Form = ({ user, userId }: FormProps) => {
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      nome: user.nome,
      picture: user.picture,
      password: '',
    },
  });
  const {
    formState: { errors },
  } = form;
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = form.handleSubmit(
    async (data: z.infer<typeof registerUserSchema>) => {
      try {
        await userService.updateUserInfos(userId, data);

        toast({
          title: 'Usuário atualizado',
          description: 'O usuário foi atualizado com sucesso',
          duration: 3000,
        });
        navigate('/usuarios');
      } catch {
        toast({
          title: 'Erro ao atualizar usuário',
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
          <h1 className="text-2xl font-bold dark:text-white">Atualizar Usuário</h1>
          <p className="text-balance text-sm text-muted-foreground dark:text-[#C4C4C4]">
            Insira as informações do usuário para atualizar
          </p>
        </div>

        <hr className="w-full my-4 border-[#c4c4c4]" />
        <div className="mt-8 flex flex-col gap-8">
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
            name="picture"
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
                <FormMessage>{errors.picture?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Insira a senha do jogo"
                    className="w-full dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.password?.message}</FormMessage>
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
