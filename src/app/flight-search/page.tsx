"use client";
import Page from "@/components/app/Page";
import Box from "@/components/generic/Box";
import Stack from "@/components/generic/Stack";
import FlightSearch from "@/components/pages/flight/home/FlightSearch";
import { useState } from "react";

export default function FlightSearchPage() {
  const [filters, setFilters] = useState([
    {
      id: 1,
      title: "Show flights with Check-in Bag...",
      isSelected: false,
    },
    {
      id: 2,
      title: "Show flights with Check-in Bag...",
      isSelected: false,
    },
    {
      id: 3,
      title: "Show flights with Check-in Bag...",
      isSelected: false,
    },
  ]);

  return (
    <Page>
      <FlightSearch />

      <div className="grid w-full grid-cols-12 gap-6">
        <div className="col-span-4">
          <Box>
            <div className="w-full justify-start rounded-2xl">
              <Stack direction="vertical" gap={15}>
                <div className="text-lg">Check-in Baggage Filter</div>
                {filters?.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="filter"
                        checked={item.isSelected}
                        value={item.id}
                        onChange={(e) => {
                          {
                            setFilters((prev) => {
                              return prev.map((item) => {
                                if (String(item.id) === e.target.value) {
                                  return {
                                    ...item,
                                    isSelected: true,
                                  };
                                } else {
                                  return {
                                    ...item,
                                    isSelected: false,
                                  };
                                }
                              });
                            });
                          }
                        }}
                      />
                      <div className="font-medium">
                        Show flights with Check-in Bag...
                      </div>
                    </div>
                  </div>
                ))}
              </Stack>
            </div>
          </Box>
        </div>
        <div className="col-span-8">
          <Box>
            <div className="h-[800px]"></div>
          </Box>
        </div>
      </div>
    </Page>
  );
}
