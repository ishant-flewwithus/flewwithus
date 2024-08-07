export interface TaxBreakup {
  key: string;
  value: number;
}

export interface ChargeBU {
  key: string;
  value: number;
}

export interface Fare {
  Currency: string;
  BaseFare: number;
  Tax: number;
  TaxBreakup: TaxBreakup[];
  YQTax: number;
  AdditionalTxnFeeOfrd: number;
  AdditionalTxnFeePub: number;
  PGCharge: number;
  OtherCharges: number;
  ChargeBU: ChargeBU[];
  Discount: number;
  PublishedFare: number;
  CommissionEarned: number;
  PLBEarned: number;
  IncentiveEarned: number;
  OfferedFare: number;
  TdsOnCommission: number;
  TdsOnPLB: number;
  TdsOnIncentive: number;
  ServiceFee: number;
  TotalBaggageCharges: number;
  TotalMealCharges: number;
  TotalSeatCharges: number;
  TotalSpecialServiceCharges: number;
}

export interface FareBreakup {
  key: string;
  value: number;
}

export interface FareBreakdown {
  Currency: string;
  PassengerType: number;
  PassengerCount: number;
  BaseFare: number;
  Tax: number;
  TaxBreakUp: FareBreakup[];
  YQTax: number;
  AdditionalTxnFeeOfrd: number;
  AdditionalTxnFeePub: number;
  PGCharge: number;
  SupplierReissueCharges: number;
}

export interface Airport {
  AirportCode: string;
  AirportName: string;
  Terminal: string;
  CityCode: string;
  CityName: string;
  CountryCode: string;
  CountryName: string;
}

export interface Origin {
  Airport: Airport;
  DepTime: string;
}

export interface Destination {
  Airport: Airport;
  ArrTime: string;
}

export interface Airline {
  AirlineCode: string;
  AirlineName: string;
  FlightNumber: string;
  FareClass: string;
  OperatingCarrier: string;
}

export interface FareClassification {
  Type: string;
}

export interface Segment {
  Baggage: string;
  CabinBaggage: string;
  CabinClass: number;
  SupplierFareClass: string | null;
  TripIndicator: number;
  SegmentIndicator: number;
  Airline: Airline;
  NoOfSeatAvailable: number;
  Origin: Origin;
  Destination: Destination;
  AccumulatedDuration: number;
  Duration: number;
  GroundTime: number;
  Mile: number;
  StopOver: boolean;
  FlightInfoIndex: string;
  StopPoint: string;
  StopPointArrivalTime: string | null;
  StopPointDepartureTime: string | null;
  Craft: string;
  Remark: string | null;
  IsETicketEligible: boolean;
  FlightStatus: string;
  Status: string;
  FareClassification: FareClassification;
}

export interface FareRule {
  Origin: string;
  Destination: string;
  Airline: string;
  FareBasisCode: string;
  FareRuleDetail: string;
  FareRestriction: string;
  FareFamilyCode: string;
  FareRuleIndex: string;
}

export interface PenaltyCharges {
  ReissueCharge: string;
  CancellationCharge: string;
}

export interface MiniFareRule {
  JourneyPoints: string;
  Type: string;
  From: string | null;
  To: string | null;
  Unit: string | null;
  Details: string;
}

export interface FareClassificationDetails {
  Color: string;
  Type: string;
}

export interface FlightSearchResult {
  FirstNameFormat: string | null;
  IsBookableIfSeatNotAvailable: boolean;
  IsHoldAllowedWithSSR: boolean;
  IsUpsellAllowed: boolean;
  LastNameFormat: string | null;
  ResultIndex: string;
  Source: number;
  IsLCC: boolean;
  IsRefundable: boolean;
  IsPanRequiredAtBook: boolean;
  IsPanRequiredAtTicket: boolean;
  IsPassportRequiredAtBook: boolean;
  IsPassportRequiredAtTicket: boolean;
  GSTAllowed: boolean;
  IsCouponAppilcable: boolean;
  IsGSTMandatory: boolean;
  AirlineRemark: string;
  IsPassportFullDetailRequiredAtBook: boolean;
  ResultFareType: string;
  Fare: Fare;
  FareBreakdown: FareBreakdown[];
  Segments: Segment[][];
  LastTicketDate: string;
  TicketAdvisory: string;
  FareRules: FareRule[];
  PenaltyCharges: PenaltyCharges;
  AirlineCode: string;
  MiniFareRules: MiniFareRule[][];
  ValidatingAirline: string;
  FareClassification: FareClassificationDetails;
}
