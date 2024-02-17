module CredChain::issue_certificate {

    use std::error;
    use std::signer;
    use std::string;
    use aptos_framework::event;

    // :!:>resource
    struct CertificateHolder has key {
        certificate_data: string::String,
    }
    //<:!:resource

    #[event]
    struct CertificateIssued has drop, store {
        account: address,
        certificate_data: string::String,
    }

    const ENO_CERTIFICATE: u64 = 0;

    #[view]
    public fun get_certificate(addr: address): string::String acquires CertificateHolder {
        assert!(exists<CertificateHolder>(addr), error::not_found(ENO_CERTIFICATE));
        borrow_global<CertificateHolder>(addr).certificate_data
    }

    public entry fun issue_certificate(account: signer, certificate_data: string::String) acquires CertificateHolder {
        let account_addr = signer::address_of(&account);
        if (!exists<CertificateHolder>(account_addr)) {
            move_to(&account, CertificateHolder {
                certificate_data,
            })
        } else {
            let certificate_holder = borrow_global_mut<CertificateHolder>(account_addr);
            certificate_holder.certificate_data = certificate_data;

            /// event::emit(CertificateIssued {
            ///     account: account_addr,
            ///     certificate_data: certificate_data,
            /// });
        }
    }

    #[test(account = @0x1)]
    public entry fun issuer_can_issue_certificate(account: signer) acquires CertificateHolder {
        let addr = signer::address_of(&account);
        aptos_framework::account::create_account_for_test(addr);
        issue_certificate(account, string::utf8(b"Certificate Data"));

        assert!(
            get_certificate(addr) == string::utf8(b"Certificate Data"),
            ENO_CERTIFICATE
        );
    }
}
