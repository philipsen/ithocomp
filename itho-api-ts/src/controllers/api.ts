
import { Response, Request } from "express";
import { Event } from "../models/itho-event";
// import { default as WebappClickEvent, WebappClickEventModel } from "../models/WebappClickEvent";
import { House } from "../models/house";

import { HouseState } from "../models/HouseState";

export let getApi = (req: Request, res: Response) => {
  console.log("here");
  res.jsonp({ a: "bla" });
};

// export let getHouses = (req: Request, res: Response) => {
//   House.find((err, houses) => {
//     if (err) return console.error(err);
//     res.send(JSON.stringify(houses));
//   });
// };

export let getHouseEvents = (req: Request, res: Response) => {
  const name = req.params.name;
  Event.find({ house: name }, undefined, { sort: { "time": -1 }, limit: 300 },
    (err, events) => {
      if (err) return console.error(err);
      res.send(JSON.stringify(events));
    });
};

// //  app.get('/api/command/:house/:room/:cmd', apiController.
// export let sendRemoteCommand = (req: Request, res: Response) => {
//   console.log('api send command', req.params.house, req.params.room, req.params.cmd);
//   //console.log('received: ', req);
//   WebappClickEvent.create({
//     house: req.params.house,
//     room: req.params.room,
//     command: req.params.cmd
//   })
//   res.send(JSON.stringify('OK'));
//   //client.publish(req.params.house + '/command/' + req.params.room, req.params.cmd);
// };


// export let getHouse = (req: Request, res: Response) => {
//   var name = req.params.name;
//   console.log('api get house ', name);
//   //var House = mongoose.model('House');
//   House.find({ name: name }, function (err, house) {
//     if (err) return console.error(err);
//     console.log('house = ', house);
//     res.send(JSON.stringify(house[0]));
//   });
// };

// // app.delete('/api/house/:name', apiController.
// export let deleteHouse = (req: Request, res: Response) => {
// };

// // app.get('/api/house/status/:name', apiController.
// export let getHouseStatus = (req: Request, res: Response) => {
  // console.log("get state");
  // const name = req.params.name;
  // // var Event = mongoose.model('Event');
  // Event.find({ house: name }, undefined, { sort: { "time": -1 }, limit: 200 },
  //  function (err: any, events: EventModel[]) {
  //   if (err) return console.error(err);
  //   events.reverse();
  //   const state: HouseState = new HouseState;
  //   state.ventilation = "none";

    // let fs = events.reduce((state, event) => {
    //   console.log('e = ', event, event.time, event.house, event.kind);
    //   //     if (event.kind === 'StoveStatus') {
    //   //       if (event.level > 0) {
    //   //         state.ventilation = "cook";
    //   //       } else {
    //   //         state.ventilation = state.ventilationBaseState;
    //   //       }
    //   //     }
    //   if (event.kind === 'WebappClick') {
    //     var e = WebappClickEvent.create(event);

    //     if (e.room === 'k') {
    //       if (event.command === 'eco' || event.command === 'comfort') {
    //         state.ventilationBaseState = event.command;
    //         state.ventilation = event.command;
    //         state.endTimeCommand = event.time;
    //       }
    //       if (event.command == 'cook1') {
    //         state.endTimeCommand = new Date(event.time.valueOf() + 30 * 60 * 1000);
    //         state.ventilation = 'cook';
    //       }
    //       if (event.command == 'cook2') {
    //         state.endTimeCommand = new Date(event.time.valueOf() + 60 * 60 * 1000);
    //         state.ventilation = 'cook';
    //       }

    //     }
    //   }
    //   console.log('cs = ', state);
    //   return state;
    // }, state);
        //   if (fs.endTimeCommand < new Date()) {
        //     //console.log('last comm expired');
        //     fs.ventilation = fs.ventilationBaseState;

        //   //} else {
        // console.log('last comm still active');

    //  });
//     const fs2 = state;
//     console.log("final =", fs2);
//     res.send(JSON.stringify(fs2));
  // });
// };
