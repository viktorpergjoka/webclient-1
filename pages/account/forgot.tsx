import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { HeadingLarge } from 'baseui/typography';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { Notification } from 'baseui/notification';
import {
  Modal, ModalBody, ModalButton, ModalFooter, ModalHeader,
} from 'baseui/modal';
import Container from '../../components/complex/depreacted/theme/layout/Container';
import Loading from '../../components/complex/depreacted/theme/Loading';
import { useAuth } from '../../lib/digitalstage/useAuth';

const Forgot = () => {
  const router = useRouter();
  const { loading, user, requestPasswordReset } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>();
  const [showPopup, setShowPopup] = useState<boolean>();

  if (!loading) {
    if (user) {
      router.push('/');
    } else {
      return (
        <Container>
          <HeadingLarge>Passwort zurücksetzen</HeadingLarge>
          <FormControl
            label="E-Mail Adresse"
          >
            <Input
              required
              name="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </FormControl>
          {error && (
          <Notification kind="negative">
            {error}
          </Notification>
          )}
          <Button onClick={() => requestPasswordReset(email)
            .then(() => setShowPopup(true))
            .catch((resetError) => setError(resetError.message))}
          >
            Zurücksetzen
          </Button>
          <Modal
            isOpen={showPopup}
            onClose={() => {
              setShowPopup(false);
              router.push('/account/login');
            }}
            unstable_ModalBackdropScroll
          >
            <ModalHeader>
              E-Mail versendet
            </ModalHeader>
            <ModalBody>
              Bitte prüfe Dein E-Mail Postfach!
            </ModalBody>
            <ModalFooter>
              <ModalButton onClick={() => {
                setShowPopup(false);
                router.push('/account/login');
              }}
              >
                Ok
              </ModalButton>
            </ModalFooter>
          </Modal>
        </Container>
      );
    }
  }

  return <Loading><HeadingLarge>Lade...</HeadingLarge></Loading>;
};

export default Forgot;
