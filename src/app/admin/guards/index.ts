import { DonutsGuard } from './donuts.guard';
import { DonutExistsGuards } from './donut-exists.guard';

export const guards: any[] = [DonutsGuard, DonutExistsGuards ];

export * from './donuts.guard';
export * from './donut-exists.guard'