import { reactive } from "vue";interface IGameButtons {
  name: string;
  isActive?: boolean;
}

const gameButtons: IGameButtons[] = reactive([
  { name: "red", isActive: false },
  { name: "green", isActive: false },
  { name: "blue", isActive: false },
  { name: "yellow", isActive: false },
]);

export default gameButtons;
