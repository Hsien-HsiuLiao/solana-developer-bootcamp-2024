use anchor_lang::prelude::*;
// Our program's address!
// This matches the key in the target/deploy directory
declare_id!("ww9C83noARSQVBnqmCUmaVdbJjmiwcV9j2LkXYMoUCV"); // program id/address filled in when deployed by solana playground

// Anchor programs always use 8 bits for the discriminator
pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8; // written to every account on the blockchain by anchor, specifies the type of account, used by anchor for some of its checks
                                                // so this will be 8 bytes

// Our Solana program! 
#[program] //macro
pub mod favorites {
    use super::*; // use everything imported at top, i e  anchor_lang::prelude::*

    // Our instruction handler! It sets the user's favorite number and color
    pub fn set_favorites(context: Context<SetFavorites>, number: u64, color: String, hobbies: Vec<String>) -> Result<()> {
        let user_public_key = context.accounts.user.key();
        msg!("Greetings from {}", context.program_id);
        msg!(
            "User {user_public_key}'s favorite number is {number}, favorite color is: {color}",
        );

        msg!(
            "User's hobbies are: {:?}",
            hobbies
        ); 

        context.accounts.favorites.set_inner(Favorites {
            number,
            color,
            hobbies
        });
        Ok(())
    }

    // We can also add a get_favorites instruction handler to return the user's favorite number and color
}

// What we will put inside the Favorites PDA
#[account]
#[derive(InitSpace)] //lets anchor know how big this struct is
pub struct Favorites {
    pub number: u64, //64 bit or 8 byte

    #[max_len(50)] //specify max length for color
    pub color: String,

    #[max_len(5, 50)] //specify max
    pub hobbies: Vec<String>
}
// When people call the set_favorites instruction, they will need to provide the accounts that will be modifed. This keeps Solana fast!
#[derive(Accounts)]
pub struct SetFavorites<'info> {   // this is struct of accounts, naming convention , same as instruction handler but in title case
    #[account(mut)]                 //signer account will pay to store favorite info on blockchain
    pub user: Signer<'info>,      // 'info says these item will live fot the lifetime of a solana account info object

    /// Initialize the favorites account if it does not exist.
/// - `payer` is the user who pays for the account creation.
/// - `space` is the size required for the account data, which includes the anchor discriminator and the `Favorites` struct.
/// - `seeds` are used to derive the account's address, ensuring it is unique for each user.
    /// bump used to calculate seeds
    #[account(
        init_if_needed,                     
        payer = user, 
        space = ANCHOR_DISCRIMINATOR_SIZE + Favorites::INIT_SPACE, 
        seeds=[b"favorites", user.key().as_ref()],
    bump)]
    pub favorites: Account<'info, Favorites>,    //need to specify the favorites account the signer wants to write to 

    pub system_program: Program<'info, System>,
}
