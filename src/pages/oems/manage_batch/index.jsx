import { React, useState, useEffect } from "react";
import useAppState from "../../../hooks/useAppState";
//import styles from "../styles/Home.module.css";
import OemLayout from "../../../Components/OemLayout/OemLayout";

import { ConsignmentDetails } from "../../../types/ConsignmentData";
import { ShipperProfile } from "../../../types/Shipper";

import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  Select,
  NumberInputField,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  formikHandleChange,
} from "formik";

import DarkBackground from "Components/DarkBackground/DarkBackground";

export default function manage_batch() {
  const {
    user,
    userProfile,
    isVerified,
    userConsignmentData,
    fetchConsignmentData,
    querySnapshotConsignments,
    querySnapshotShippers,
  } = useAppState();

  const [selectedConsignment, setSelectedConsignment] = useState(null);
  const [consignmentData, setConsignmentData] = useState(null);
  // console.log(selectedConsignment.batch_id)
  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace OEMS - Manage Batch</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Heading
          className="heading"
          fontSize="5rem"
          color="brand.0"
          fontWeight="medium"
          textAlign="center"
        >
          MANAGE BATCH
        </Heading>
        <Flex
          flexDirection={["column", "row"]}
          justify="center"
          gap="60px"
          marginBottom="30px"
        >
          {/* User balances */}
          <DarkBackground>
            <Box display="flex" flexDirection="column">
              <Box height="50px" mt={20} pl={15} pr={15}>
                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  gap={2}
                >
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Batch ID:{" "}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Product Name:{" "}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Product ID:{" "}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Quantity{" "}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Status{" "}
                  </Heading>
                </Flex>
              </Box>
              <Box height="100px" mt={5} mb={20} pl={15} pr={15}>
                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  gap={2}
                >
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    {selectedConsignment?.batch_id}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                     {selectedConsignment?.product_name}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                  {selectedConsignment?.product_id}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    {selectedConsignment?.batch_quantity}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                   {selectedConsignment?.shipping_status}
                  </Heading>
                </Flex>
              </Box>
              <Box height="100px" mt={20} mb={20} pl={15}>
                <Flex justifyContent="center" alignItems="center" height="100%">
                  <Formik
                    initialValues={{
                      batchId: "",
                      Shipper: "",
                    }}
                    onSubmit={handleSubmit}
                  >
                    <>
                      <FormControl id="batchId">
                        <FormLabel color="white">Batch ID</FormLabel>
                        <Field
                          as={Select}
                          onChange={(e) => {
                            const selectedBatchId = e.target.value;
                            const selectedConsignmentData =
                              querySnapshotConsignments?.docs
                                .find(
                                  (doc) =>
                                    doc.data().batch_id === selectedBatchId
                                )
                                ?.data();
                            setSelectedConsignment(selectedConsignmentData);
                            console.log(e.target.value);
                          }}
                          name="batchId"
                          width="98%"
                          height="40px"
                          color="white"
                          placeholder="Select Batch ID"
                        >
                          {querySnapshotConsignments &&
                          querySnapshotConsignments.docs.length > 0 ? (
                            querySnapshotConsignments.docs.map((doc) => {
                              const consignmentData = doc.data();
                              return (
                                <option
                                  key={doc.id}
                                  value={consignmentData.batch_id}
                                >
                                  {consignmentData.batch_id}
                                </option>
                              );
                            })
                          ) : (
                            <option value="">
                              No Consignments to allocated
                            </option>
                          )}
                        </Field>
                      </FormControl>
                      <FormControl id="Shipper" mx="auto">
                        <FormLabel color="white">Shipper</FormLabel>
                        <Field
                          as={Select}
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                          name="shipper"
                          width="98%"
                          height="40px"
                          color="white"
                          placeholder="Select Shipper"
                        >
                          {querySnapshotShippers &&
                          querySnapshotShippers.size > 0 ? (
                            querySnapshotShippers.docs.map((doc) => {
                              const shipper = doc.data();
                              return (
                                <option
                                  key={shipper.wallet_address}
                                  value={shipper.business_name}
                                >
                                  {shipper.business_name}
                                </option>
                              );
                            })
                          ) : (
                            <option value="">No shippers found</option>
                          )}
                        </Field>
                      </FormControl>

                      <Button
                        margin="40px 20px 20px 20px"
                        w="70%"
                        type="submit"
                      >
                        Assign Batch
                      </Button>
                    </>
                  </Formik>
                </Flex>
              </Box>
            </Box>
          </DarkBackground>
          {/* Mint Tokens */}
        </Flex>
      </OemLayout>
    </>
  );
}
