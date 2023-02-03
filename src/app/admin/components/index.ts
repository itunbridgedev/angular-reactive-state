import { DonutCardComponent } from "./donut-card/donut-card.component";
import { DonutFormComponent } from "./donut-form/donut-form.component";

// Add all components used in this module to an array so declaration/exports can be
// added easily with the spread operator in the admin.module
export const components: any[] = [
  DonutCardComponent,
  DonutFormComponent
]

// TODO: Test if this if this is required
export * from "./donut-card/donut-card.component";
export * from "./donut-form/donut-form.component";