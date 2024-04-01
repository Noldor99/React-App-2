import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(Board),
          useClass: Repository,
        },

      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(getRepositoryToken(Board));

  });

  const createBoardDto: CreateBoardDto = {
    title: 'SuperBoard',

  };

  const createdBoard = new Board();
  createdBoard.id = '1';

  Object.assign(createdBoard, createBoardDto);

  const boards: Board[] = [
    {
      id: '1',
      title: 'Superman',
      todos: [],
      createdAt: new Date
    },
    {
      id: '2',
      title: 'Superman',
      todos: [],
      createdAt: new Date
    },
  ];


  it('should create a board', async () => {
    jest.spyOn(boardRepository, 'create').mockReturnValueOnce(createdBoard);
    jest.spyOn(boardRepository, 'save').mockResolvedValueOnce(createdBoard);

    const result = await boardService.create(createBoardDto);

    expect(boardRepository.create).toHaveBeenCalledWith(createBoardDto);
    expect(boardRepository.save).toHaveBeenCalledWith(createdBoard);
    expect(result).toEqual(createdBoard);
  });




  it('should find a board by ID', async () => {
    const boardId = '1';
    const existingBoard = boards.find((board) => board.id === boardId);
    jest.spyOn(boardRepository, 'findOne').mockResolvedValueOnce(existingBoard);

    const result = await boardService.findOne(boardId);

    expect(boardRepository.findOne).toHaveBeenCalledWith({
      where: { id: boardId },
      relations: {},
    });
    expect(result).toEqual(existingBoard);
  });

  it('should throw NotFoundException if board with given ID is not found', async () => {
    const boardId = '2';
    jest.spyOn(boardRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(boardService.findOne(boardId)).rejects.toThrow(
      NotFoundException,
    );
    expect(boardRepository.findOne).toHaveBeenCalledWith({
      where: { id: boardId },
      relations: {},
    });
  });

  it('should remove a board by ID', async () => {
    const boardId = '1';
    const existingBoard = boards.find((board) => board.id === boardId);

    jest.spyOn(boardRepository, 'findOne').mockResolvedValueOnce(existingBoard);
    jest.spyOn(boardRepository, 'remove').mockResolvedValueOnce(existingBoard);

    const result = await boardService.remove(boardId);

    expect(boardRepository.findOne).toHaveBeenCalledWith({
      where: { id: boardId },
      relations: {},
    });
    expect(boardRepository.remove).toHaveBeenCalledWith(existingBoard);
    expect(result).toEqual(existingBoard);
  });

  it('should throw NotFoundException if board with given ID is not found', async () => {
    const boardId = '2';
    jest.spyOn(boardRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(boardService.remove(boardId)).rejects.toThrow(NotFoundException);
    expect(boardRepository.findOne).toHaveBeenCalledWith({
      where: { id: boardId },
      relations: {},
    });
  });

});
