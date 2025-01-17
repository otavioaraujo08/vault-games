import { Dialog } from '@/components/Dialog';
import { StatusChip } from '@/components/StatusChip';
import { UnlinkMessage } from '@/components/UnlinkMessage';
import { Game } from '@/types/Games';
import type { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';

export const GamesColumns: ColumnDef<Game>[] = [
  {
    accessorKey: 'Poster',
    header: () => {
      return <div className="ml-9 dark:text-white">Poster</div>;
    },
    cell: ({ row }) => {
      return (
        <img
          src={row.original.image}
          alt="Poster"
          className="w-fit max-w-[7.5rem] h-44"
        />
      );
    },
  },
  {
    accessorKey: 'Identificador',
    header: () => {
      return (
        <div className="flex justify-center dark:text-white">Identificador</div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center dark:text-white tracking-wider text-[0.9rem]">
          {row.original._id}
        </div>
      );
    },
  },
  {
    accessorKey: 'Nome',
    header: () => {
      return <div className="flex justify-center dark:text-white">Nome</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center dark:text-white tracking-wider text-[0.9rem]">
          {row.original.nome}
        </div>
      );
    },
  },
  {
    accessorKey: 'Tempo',
    header: () => {
      return <div className="text-center dark:text-white">Horas de Jogo</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center dark:text-white tracking-wider text-[0.9rem]">
          {row.original.hours !== 0 ? `${row.original.hours} Horas` : 'N/A'}
        </div>
      );
    },
  },
  {
    accessorKey: 'Status',
    header: () => {
      return <div className="flex justify-center dark:text-white">Status</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <StatusChip status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'options',
    header: () => {
      return <div className="dark:text-white">Opções</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="dark:text-white">
          <Dialog
            buttonTitle={<Trash color="white" />}
            title="Apagar Game"
            description="Você tem certeza de que deseja apagar esse game?"
            className="size-12 rounded-full bg-red-600 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700"
            buttonActionTitle="Apagar"
            buttonSubmitClassname="w-full text-white bg-red-600 hover:bg-red-700 md:w-fit"
            onClose={() => console.log("I'm closing")}
          >
            <UnlinkMessage>
              <p className="dark:text-white max-w-[50rem] text-[1rem] md:text-[1.2rem] lg:text-[1.4rem]">
                Você tem certeza de que deseja apagar o game{' '}
                <strong>{row.original?.nome || 'Game'} </strong> ? Todas as
                incrições cadastradas nesse game serão apagadas
              </p>
            </UnlinkMessage>
          </Dialog>
        </div>
      );
    },
  },
];
