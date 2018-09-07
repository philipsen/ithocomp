// import { HouseState } from "./HouseState";

// class HouseStateFactory extends EventRepo{
//     generate(house: string) : HouseState {
//         let hs = new HouseState;

//         let events: IEvent[] = this.getEvents(house);

//         events.forEach(event => {
//             hs = this.applyEvent(hs, event);
//         });

//         return hs;
//     }

//     private applyEvent(hs: HouseState, event: IEvent): any {
//         switch (event.kind) {
//             case 'WappappClickEvent':
//                 return this.applyWappappClickEvent(hs, event as IWebappClickEvent);
//                 case 'StoveStatusEvent':
//                     return this.applyStoveStatusEvent(hs, event as IStoveStatusEvent);
//             default:
//                 break;
//         }
//         throw new Error("Method not implemented.");
//     }

//     private applyWappappClickEvent(state: HouseState, event: IWebappClickEvent): HouseState {
//         if (event.room === 'k') {
//             if (event.command === 'eco' || event.command === 'comfort') {
//               state.ventilationBaseState = event.command;
//               state.ventilation = event.command;
//               state.endTimeCommand = event.time;
//             }
//             if (event.command == 'cook1') {
//               state.endTimeCommand = new Date(event.time.valueOf() + 30 * 60 * 1000);
//               state.ventilation = 'cook';
//             }
//             if (event.command == 'cook2') {
//               state.endTimeCommand = new Date(event.time.valueOf() + 60 * 60 * 1000);
//               state.ventilation = 'cook';
//             }  
//           }
//         return state;
//     }

//     private applyStoveStatusEvent(state: HouseState, event: IStoveStatusEvent): HouseState {
//         if (event.level > 0) {
//           state.ventilation = "cook";
//         } else {
//           state.ventilation = state.ventilationBaseState;
//         }
//         return state;
//       }
// }