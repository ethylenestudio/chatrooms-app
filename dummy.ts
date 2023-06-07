export const DUMMY: DummyType = {
  conversations: [
    {
      name: "General Chat",
      lastMessage: "Next talk starts in 5mins, lets meet over there team!",
      chosen: false,
    },
    {
      name: "Arbitrum Room",
      lastMessage: "Great airdrop guys, it was a pleasure to meet all of you!",
      chosen: false,
    },
    {
      name: "Arbitrum Room",
      lastMessage: "This is sick!",
      chosen: false,
    },
    {
      name: "Arbitrum Room",
      lastMessage: "Great airdrop guys, it was a pleasure to meet all of you!",
      chosen: false,
    },
    {
      name: "Arbitrum Room",
      lastMessage: "Great airdrop guys, it was a pleasure to meet all of you!",
      chosen: true,
    },
    {
      name: "Arbitrum Room",
      lastMessage: "Great airdrop guys, it was a pleasure to meet all of you!",
      chosen: false,
    },
    {
      name: "Arbitrum Room",
      lastMessage: "Great airdrop guys, it was a pleasure to meet all of you!",
      chosen: false,
    },
    {
      name: "Arbitrum Room",
      lastMessage: "Great airdrop guys, it was a pleasure to meet all of you!",
      chosen: false,
    },
    {
      name: "Arbitrum Room",
      lastMessage: "Great airdrop guys, it was a pleasure to meet all of you!",
      chosen: false,
    },
    {
      name: "Arbitrum Room",
      lastMessage: "Great airdrop guys, it was a pleasure to meet all of you!",
      chosen: false,
    },
  ],
  messages: [
    {
      content:
        "Ulas, do you think paymaster economy will take-over token incentives or not? If so, when do you think it will?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 10,
      upvoted: true,
    },
    {
      content:
        "Ulas, do you think paymaster economy will take-over token incentives or not? If so, when do you think it will?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 8,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 6,
      upvoted: true,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 3,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 1,
      upvoted: true,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
    {
      content: "Anyone wanna get a coffee after this event?",
      sender: "0x29ac1acE40f6051758739276a8aa152a42fbf544",
      upvotes: 0,
      upvoted: false,
    },
  ],
};

type DummyType = {
  conversations: ConversationType[];
  messages: MessageType[];
};

type ConversationType = {
  name: string;
  lastMessage: string;
  chosen: boolean;
};

type MessageType = {
  content: string;
  sender: string;
  upvotes: number;
  upvoted: boolean;
};

export type Session = {
  id: number;
  name: string;
  created_by: number;
  organization_id: number;
};
