import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  type PhoneNumber = {
    number : Text;
    state : Text;
    city : Text;
    isActive : Bool;
    messageCount : Nat;
  };

  type SMSMessage = {
    senderNumber : Text;
    messageBody : Text;
    receivedTimestamp : Time.Time;
  };

  let phoneNumbers = Map.empty<Text, PhoneNumber>();
  let messages = Map.empty<Text, List.List<SMSMessage>>();

  func getPhoneNumberInternal(number : Text) : PhoneNumber {
    switch (phoneNumbers.get(number)) {
      case (null) { Runtime.trap("Phone number not found") };
      case (?phone) { phone };
    };
  };

  module PhoneNumber {
    public func compare(p1 : PhoneNumber, p2 : PhoneNumber) : Order.Order {
      Text.compare(p1.number, p2.number);
    };
  };

  let seedPhoneNumbers : [PhoneNumber] = [
    {
      number = "+14155550101";
      state = "California";
      city = "San Francisco";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+12125550102";
      state = "New York";
      city = "New York City";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+13125550103";
      state = "Illinois";
      city = "Chicago";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+16175550104";
      state = "Texas";
      city = "Houston";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+12025550105";
      state = "District of Columbia";
      city = "Washington";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+15035550106";
      state = "Oregon";
      city = "Portland";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+14075550107";
      state = "Florida";
      city = "Miami";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+18005550108";
      state = "Colorado";
      city = "Denver";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+13165550109";
      state = "Minnesota";
      city = "Minneapolis";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+16025550110";
      state = "Arizona";
      city = "Phoenix";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+13195550111";
      state = "Indiana";
      city = "Indianapolis";
      isActive = true;
      messageCount = 0;
    },
    {
      number = "+15125550112";
      state = "Texas";
      city = "Austin";
      isActive = true;
      messageCount = 0;
    },
  ];

  let seedMessages : [(Text, [SMSMessage])] = [
    (
      "+14155550101",
      [
        {
          senderNumber = "Google";
          messageBody = "Your Google verification code is 123456";
          receivedTimestamp = 1_676_515_200_000_000_000;
        },
        {
          senderNumber = "Amazon";
          messageBody = "Amazon OTP: 789123";
          receivedTimestamp = 1_676_515_200_000_000_000;
        },
        {
          senderNumber = "PayPal";
          messageBody = "PayPal security code: 456789";
          receivedTimestamp = 1_676_515_200_000_000_000;
        },
      ],
    ),
    (
      "+12125550102",
      [
        {
          senderNumber = "Facebook";
          messageBody = "FB login code: 987654";
          receivedTimestamp = 1_676_515_200_000_000_000;
        },
        {
          senderNumber = "Twitter";
          messageBody = "Twitter verification: 112233";
          receivedTimestamp = 1_676_515_200_000_000_000;
        },
      ],
    ),
    (
      "+13125550103",
      [
        {
          senderNumber = "Microsoft";
          messageBody = "Microsoft OTP: 445566";
          receivedTimestamp = 1_676_515_200_000_000_000;
        },
        {
          senderNumber = "Uber";
          messageBody = "Uber confirmation code: 778899";
          receivedTimestamp = 1_676_515_200_000_000_000;
        },
        {
          senderNumber = "Instagram";
          messageBody = "IG verification: 001122";
          receivedTimestamp = 1_676_515_200_000_000_000;
        },
      ],
    ),
  ];

  func seedDB() {
    for (phone in seedPhoneNumbers.values()) {
      phoneNumbers.add(phone.number, phone);
      messages.add(phone.number, List.empty<SMSMessage>());
    };

    for ((number, msgs) in seedMessages.values()) {
      let msgList = List.fromArray<SMSMessage>(msgs);
      messages.add(number, msgList);

      let phone = getPhoneNumberInternal(number);
      let updatedPhone = {
        phone with
        messageCount = msgs.size();
      };
      phoneNumbers.add(number, updatedPhone);
    };
  };

  seedDB();

  public query ({ caller }) func getAllPhoneNumbers() : async [PhoneNumber] {
    phoneNumbers.values().toArray().sort();
  };

  public query ({ caller }) func getMessagesForNumber(number : Text) : async [SMSMessage] {
    switch (messages.get(number)) {
      case (null) { Runtime.trap("No messages found for this number") };
      case (?msgs) { msgs.toArray() };
    };
  };

  public shared ({ caller }) func addMessage(number : Text, sender : Text, body : Text) : async () {
    let newMessage : SMSMessage = {
      senderNumber = sender;
      messageBody = body;
      receivedTimestamp = Time.now();
    };

    switch (messages.get(number)) {
      case (null) { Runtime.trap("Phone number not found") };
      case (?msgList) {
        msgList.add(newMessage);
        let phone = getPhoneNumberInternal(number);
        let updatedPhone = {
          phone with
          messageCount = phone.messageCount + 1;
        };
        phoneNumbers.add(number, updatedPhone);
      };
    };
  };

  public query ({ caller }) func getActiveNumbers() : async [PhoneNumber] {
    phoneNumbers.values().toArray().filter(func(num) { num.isActive }).sort();
  };

  public query ({ caller }) func getNumbersByState(state : Text) : async [PhoneNumber] {
    phoneNumbers.values().toArray().filter(func(num) { num.state == state }).sort();
  };

  public shared ({ caller }) func deactivateNumber(number : Text) : async () {
    let phone = getPhoneNumberInternal(number);
    let updatedPhone = {
      phone with
      isActive = false;
    };
    phoneNumbers.add(number, updatedPhone);
  };
};
