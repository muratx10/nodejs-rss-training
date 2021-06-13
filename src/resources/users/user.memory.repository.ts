import MemoryDB from '../common/memoryDB';
import { IUser } from './user.model';

export default new MemoryDB<string, IUser>();


