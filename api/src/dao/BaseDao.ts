import { DeleteResult, EntityManager, ObjectLiteral, Repository, UpdateResult } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

export default abstract class BaseDao {
    protected manager: EntityManager;
    protected abstract repository: Repository<ObjectLiteral>;

    protected constructor(manager: EntityManager) {
        this.manager = manager;
    }
    public async find(params?: any): Promise<any> {
        return this.repository.find(params);
    }

    public async paginatedResults(page: number,pageSize: number,params?: any) {
        const condition = params;
        

        const [list, count] = await Promise.all([
          this.repository.find({
            // select: {
            //   id: true,
            //   username: true,
            //   avatarURL: true,
            // },
            where: condition,
            skip: (page - 1) * pageSize,
            take: pageSize,
          }),
          this.repository.count(),
        ]);
        const pageCount = Math.ceil(count / pageSize);
        const hasPreviousPage = page > 1;
        const hasNextPage = page < pageCount;
        return {
          list,
          count,
          page,
          pageSize,
          pageCount,
          hasPreviousPage,
          hasNextPage
        };
    }

    public async findOne(
        conditions: ObjectLiteral,
        options?: FindOneOptions<ObjectLiteral>,
    ): Promise<any> {
        return this.repository.findOne(conditions, options);
    }

    public async findById(id: any, options?: any): Promise<any> {
        return this.repository.findOne(id, options);
    }

    public async create(params: ObjectLiteral): Promise<any> {
        const entity = this.repository.create(params);
        return this.repository.save(entity);
    }

    public async update(id: any, params: ObjectLiteral): Promise<UpdateResult> {
        return this.repository.update(id, params);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }



    // function paginatedResults(model) {
    //     return async (req, res, next) => {
    //       const page = parseInt(req.query.page)
    //       const limit = parseInt(req.query.limit)
      
    //       const startIndex = (page - 1) * limit
    //       const endIndex = page * limit
      
    //       const results = {}
      
    //       if (endIndex < await model.countDocuments().exec()) {
    //         results.next = {
    //           page: page + 1,
    //           limit: limit
    //         }
    //       }
          
    //       if (startIndex > 0) {
    //         results.previous = {
    //           page: page - 1,
    //           limit: limit
    //         }
    //       }
    //       try {
    //         results.results = await model.find().limit(limit).skip(startIndex).exec()
    //         res.paginatedResults = results
    //         next()
    //       } catch (e) {
    //         res.status(500).json({ message: e.message })
    //       }
    //     }
    // }
}
