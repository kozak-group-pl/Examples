import { Body, Controller, Delete, Get, Inject, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
    CHANGE_FAQS_ORDER,
    CreateFaqRequest,
    CREATE_FAQ,
    DELETE_FAQ,
    Faq,
    ServiceMessage,
    GET_FAQS,
    QuerySearchRequest,
    UpdateFaqRequest,
    UPDATE_FAQ,
    ListResponse,
} from '@secret/shared-lib';
import { RoleGuard, UserGroups } from '../../auth/guards/role.guard';
import { AdminServiceName } from '../../../services/options/admin-svc.options';
import { ActiveGuard } from '../../auth/guards/active.guard';
import { UserPasswordExpireGuard } from '../../auth/guards/user-password-expire.guard';

@Controller('admin/faqs')
@UseGuards(RoleGuard(UserGroups.ADMIN, UserGroups.MARKETING), ActiveGuard, UserPasswordExpireGuard)
export class AdminFaqController {
    constructor(@Inject(AdminServiceName) private readonly client: ClientProxy) {}

    @Get()
    async getAll(@Query() query: QuerySearchRequest): Promise<ListResponse<Faq>> {
        return await this.client
            .send(
                GET_FAQS,
                new ServiceMessage<QuerySearchRequest>({ dto: query }),
            )
            .toPromise();
    }

    @Post()
    async createFaq(@Body() body: CreateFaqRequest): Promise<Faq> {
        return await this.client
            .send(
                CREATE_FAQ,
                new ServiceMessage<CreateFaqRequest>({ dto: body }),
            )
            .toPromise();
    }

    @Put('/change-order')
    async changeOrder(@Body() { order: orderIds }: { order: Array<number> }) {
        return this.client
            .send(
                CHANGE_FAQS_ORDER,
                new ServiceMessage<number[]>({ dto: orderIds }),
            )
            .toPromise();
    }

    @Put('/:id')
    async updateFaq(@Req() req: any, @Body() body: Omit<UpdateFaqRequest, 'id'>): Promise<Faq> {
        return await this.client
            .send(
                UPDATE_FAQ,
                new ServiceMessage<UpdateFaqRequest>({ dto: { ...body, id: +req.params.id } }),
            )
            .toPromise();
    }

    @Delete('/:id')
    async delete(@Req() req: any): Promise<Faq> {
        return this.client
            .send(
                DELETE_FAQ,
                new ServiceMessage<number>({ dto: req.params.id }),
            )
            .toPromise();
    }
}
